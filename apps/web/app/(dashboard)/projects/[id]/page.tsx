import React from "react";

interface SingleProjectProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SingleProject({ params }: SingleProjectProps) {
  const { id } = await params;

  return (
    <div className="p-6">
      <p>Project ID: {id}</p>
    </div>
  );
}
