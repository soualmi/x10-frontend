import * as React from "react";
import { notFound } from "next/navigation";
import { fetchProducts } from "@/lib/api";
import { transformProductToOpportunity } from "@/lib/transformers";
import OpportunityDetailClient from "./OpportunityDetailClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OpportunityDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const products = await fetchProducts({ limit: 200 });
  const product =
    products.find((p: any) => String(p?.id ?? p?.productId ?? p?.sku ?? "") === String(id)) ?? null;

  if (!product) return notFound();

  const opportunity = await transformProductToOpportunity(product);

  return <OpportunityDetailClient opportunity={opportunity} />;
}
