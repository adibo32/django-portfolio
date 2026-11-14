"use client";

import type { JSX } from "react";
import { FullStackView } from "./FullStackView";
import { ErpView } from "./ErpView";
import { ApiView } from "./ApiView";
import { AiView } from "./AiView";
import { BackLink } from "./parts";
import type { ServiceSlug } from "@/lib/services";


const VIEWS: Record<ServiceSlug, () => JSX.Element> = {
  "full-stack": FullStackView,
  erp: ErpView,
  schnittstellen: ApiView,
  ki: AiView,
};

export function ServiceDetail({ slug }: { slug: ServiceSlug }) {
  const View = VIEWS[slug];

  return (
    <div className="relative overflow-hidden">
      <div className="blob b1 -left-40 -top-64 size-[600px] bg-accent opacity-20 blur-[130px]" />
      <div className="gridlines" />
      <div className="container-max relative pb-24 pt-8">
        <BackLink />
        <div className="rise-1">
          <View />
        </div>
      </div>
    </div>
  );
}
