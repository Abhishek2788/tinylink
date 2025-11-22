import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, context) {
  const { code } = await context.params;
  try {
    const link = await prisma.link.findUnique({ where: { code } });
    if (!link)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(link);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { code } = await params;

  try {
    const link = await prisma.link.findUnique({ where: { code } });
    if (!link) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    await prisma.link.delete({ where: { code } });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error means server", details: err.message },
      { status: 500 }
    );
  }
}
