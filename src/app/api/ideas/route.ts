import { NextRequest, NextResponse } from "next/server";
import { queryIdeas } from "@/lib/repo";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";
import {
  IdeasQuerySchema,
  badRequest,
  searchParamsToObject,
} from "@/lib/validation";

export const dynamic = "force-dynamic";

/**
 * JSON mirror of the Idea Database page — same validated query language,
 * same SQL-side filtering and pagination. Response: { ideas, total, page,
 * pageSize, pageCount }.
 */
export async function GET(req: NextRequest) {
  const rl = rateLimit(`ideas:${clientIp(req)}`, { limit: 120, windowMs: 60_000 });
  if (!rl.ok) return tooManyRequests(rl);

  const parsed = IdeasQuerySchema.safeParse(
    searchParamsToObject(req.nextUrl.searchParams),
  );
  if (!parsed.success) return badRequest(parsed.error);

  const page = await queryIdeas(parsed.data);
  return NextResponse.json(page, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
  });
}
