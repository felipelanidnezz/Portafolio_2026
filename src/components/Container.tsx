import type { ElementType, ReactNode } from "react";

type ContainerSize = "lg" | "md";

const sizeClasses: Record<ContainerSize, string> = {
  lg: "max-w-6xl",
  md: "max-w-3xl",
};

type ContainerProps<T extends ElementType = "div"> = {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
  as?: T;
};

export default function Container<T extends ElementType = "div">({
  children,
  className = "",
  size = "lg",
  as,
}: ContainerProps<T>) {
  const Tag = as ?? "div";

  return (
    <Tag className={`mx-auto w-full px-6 ${sizeClasses[size]} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
