import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, collection, addDoc, getDocs } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const { interactionId, option, fanTeam } = await req.json();
    
    const pulseDocRef = doc(db, 'pulses', interactionId);
    await setDoc(pulseDocRef, { createdAt: Date.now() }, { merge: true });
    
    const votesRef = collection(pulseDocRef, 'votes');
    await addDoc(votesRef, {
      option,
      fanTeam,
      timestamp: Date.now(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Social Pulse POST error:', error);
    return NextResponse.json({ error: 'Failed to submit vote' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const interactionId = searchParams.get('interactionId');
    if (!interactionId) return NextResponse.json({ error: 'Missing interactionId' }, { status: 400 });

    const votesRef = collection(db, 'pulses', interactionId, 'votes');
    const snapshot = await getDocs(votesRef);
    
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

    return NextResponse.json({ totalVotes, results });
  } catch (error) {
    console.error('Social Pulse GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}
