import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
const { code } = await params;
const link = await prisma.link.findUnique({ where: { code } });
if (!link) {
return NextResponse.json({ error: 'URL Not found ' }, { status: 404 });
}


// update clicks and lastClicked asynchronously but wait for it to succeed
await prisma.link.update({
where: { code },
data: { clicks: { increment: 1 }, lastClicked: new Date() }
});


return NextResponse.redirect(link.longUrl, 302);
}