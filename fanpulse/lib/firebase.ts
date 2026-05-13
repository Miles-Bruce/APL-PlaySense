import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, getDocs, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

export const submitVote = async (interactionId: string, option: string, fanTeam: string) => {
  try {
    const pulseDocRef = doc(db, 'pulses', interactionId);
    // Ensure the parent doc exists (can use setDoc with merge)
    await setDoc(pulseDocRef, { createdAt: Date.now() }, { merge: true });
    
    const votesRef = collection(pulseDocRef, 'votes');
    await addDoc(votesRef, {
      option,
      fanTeam,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error submitting vote:', error);
  }
};

export const subscribeToResults = (interactionId: string, callback: (data: any) => void) => {
  const votesRef = collection(db, 'pulses', interactionId, 'votes');
  const q = query(votesRef);
  
  return onSnapshot(q, (snapshot) => {
    const totalVotes = snapshot.docs.length;
    const optionCounts: Record<string, number> = {};
    
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      optionCounts[data.option] = (optionCounts[data.option] || 0) + 1;
    });

    const results = Object.keys(optionCounts).map((option) => ({
      option,
      count: optionCounts[option],
      percentage: totalVotes > 0 ? Math.round((optionCounts[option] / totalVotes) * 100) : 0,
    }));

    callback({ totalVotes, results });
  });
};
