import * as React from "react";
import { notFound } from "next/navigation";
import { fetchProducts } from "@/lib/api";
import { transformProductToOpportunity } from "@/lib/transformers";
import OpportunityDetailClient from "./OpportunityDetailClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// NOTE: Dans ce projet, PageProps attend params en Promise (ne pas “normaliser”).
export default async function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;
if (!id) return notFound();

  const products = await fetchProducts({ limit: 200 });

  const product =
    products.find((p: any) => String(p?.id ?? p?.productId ?? p?.sku ?? "") === String(id)) ?? null;

  if (!product) return notFound();

  const opportunity = transformProductToOpportunity(product);

  return (
    <>

      <p className="text-xs text-muted-foreground mt-2 mb-4">
        <span className="block">
          FR : Oracle est un outil d’aide à la décision e-commerce — pas une plateforme financière.
        </span>
        <span className="block">
          EN : Oracle is an e-commerce decision intelligence tool — not a financial or investment platform.
        </span>
      </p>

      <OpportunityDetailClient opportunity={opportunity} />
    </>
  );
}
