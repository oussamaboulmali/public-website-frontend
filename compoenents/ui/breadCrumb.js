import React from "react";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiChevronDoubleLeft, mdiChevronDoubleRight } from "@mdi/js";

const BreadCrumb = ({ items = [], dir, isArticleAlias, others }) => {
  if (!items || items.length === 0) return null;

  const getClickableInfo = (index) => {
    const len = items.length;
    if (others) {
      if (len === 2) {
        return { clickable: true, path: `/${items[0]?.path}` };
      }
    } else {
      if (len === 1 && index === 0) {
        return { clickable: true, path: `/${items[0].path}` };
      }
      if (len === 2 && index === 0 && isArticleAlias(items[1]?.path)) {
        return { clickable: true, path: `/${items[0]?.path}` };
      }

      if (len >= 3 && (index === 1 || index === 2)) {
        return {
          clickable: true,
          path: `/${items[index - 1]?.path}/${items[index].path}`,
        };
      }
    }

    return { clickable: false, path: null };
  };

  return (
    <nav aria-label="Fil d’Ariane" className="w-full max-w-5xl my-6 px-4">
      <ol className="flex flex-wrap items-center gap-2 text-[18px] text-gray-500">
        {items?.map((item, index) => {
          const isLast = index === items.length - 1;
          const displayItem =
            item?.length > 50
              ? `${item.label.substring(0, 50)}...`
              : item.label;
          const { clickable, path } = getClickableInfo(index);

          return (
            <li key={index} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-[#003979] font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] block">
                  {displayItem}
                </span>
              ) : clickable ? (
                <>
                  <Link
                    href={path.replace(/^\/+/, "/")}
                    className="hover:text-[#1D589F] transition-colors whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] block"
                  >
                    {decodeURIComponent(displayItem)}
                  </Link>
                  <Icon
                    path={
                      dir === "rtl"
                        ? mdiChevronDoubleLeft
                        : mdiChevronDoubleRight
                    }
                    size={1}
                  />
                </>
              ) : (
                <>
                  <span className="text-[#003979] font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] block">
                    {decodeURIComponent(displayItem)}
                  </span>
                  <Icon
                    path={
                      dir === "rtl"
                        ? mdiChevronDoubleLeft
                        : mdiChevronDoubleRight
                    }
                    size={0.8}
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
