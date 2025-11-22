import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { nanoid } from 'nanoid';


const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;


export async function GET() {
const all = await prisma.link.findMany({ orderBy: { createdAt: 'desc' } });
return NextResponse.json(all);
}


export async function POST(req) {
const body = await req.json();
const { longUrl, code: customCode } = body;


// Basic validation
if (!longUrl) {
return NextResponse.json({ error: 'longUrl required' }, { status: 400 });
}

// Require http:// or https:// only means here .text whether https:// exist in url or not
if (!/^https?:\/\/.+/i.test(longUrl)) {
  return NextResponse.json(
    { error: "URL must start with http:// or https://" },
    { status: 400 }
  );
}


// Validate URL format
try {
new URL(longUrl);
} catch (e) {
return NextResponse.json({ error: 'Invalid URL Format' }, { status: 400 });
}


let code = customCode?.trim();


if (code) {
if (!CODE_REGEX.test(code)) {
return NextResponse.json({ error: 'Code must match [A-Za-z0-9]{6,8}' }, { status: 400 });
}
// check uniqueness
const exists = await prisma.link.findUnique({ where: { code } });
if (exists) {
return NextResponse.json({ error: 'Code already exists' }, { status: 409 });
}
} else {
// generate until unique (very unlikely to loop)
do {
code = nanoid(7);
} while (await prisma.link.findUnique({ where: { code } }));
}


const created = await prisma.link.create({
data: { code, longUrl }
});


return NextResponse.json({ code: created.code, longUrl: created.longUrl, createdAt: created.createdAt });
}