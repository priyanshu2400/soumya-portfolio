"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { PortfolioSection } from "@/lib/types";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const isFileList = (value: unknown): value is FileList =>
  typeof FileList !== "undefined" && value instanceof FileList;

const schema = z.object({
  sectionId: z.string().min(1, "Select a section"),
  caption: z.string().optional(),
  altText: z.string().optional(),
  order: z.coerce.number().int().min(0).default(0),
  files: z
    .any()
    .refine(
      (files) => isFileList(files) && files.length > 0,
      "Choose at least one image.",
    )
    .refine(
      (files) =>
        !isFileList(files) ||
        Array.from(files).every(
          (file) =>
            typeof file === "object" &&
            file !== null &&
            "type" in file &&
            typeof (file as File).type === "string" &&
            (file as File).type.startsWith("image/"),
        ),
      "Only image uploads are supported.",
    ),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  sections: PortfolioSection[];
};

export const ImageUploadForm = ({ sections }: Props) => {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const [status, setStatus] = useState<null | { type: "success" | "error"; message: string }>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      order: 0,
    },
  });

  const onSubmit = async (values: FormValues) => {
    const files: File[] = Array.from(values.files ?? []);
    if (!files.length) {
      setStatus({ type: "error", message: "No files selected." });
      return;
    }

    const successes: string[] = [];
    const failures: string[] = [];
    const baseOrder = values.order;

    for (const [index, file] of files.entries()) {
      const sanitizedName = file.name.replace(/\s+/g, "-").toLowerCase();
      const uniqueId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${file.lastModified}-${index}`;
      const filePath = `${values.sectionId}/${uniqueId}-${sanitizedName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        failures.push(`${file.name} (${uploadError.message})`);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio-images").getPublicUrl(filePath);

      const { error: insertError } = await supabase.from("images").insert({
        section_id: values.sectionId,
        url: publicUrl,
        caption: values.caption ?? null,
        alt_text: values.altText ?? null,
        order: baseOrder + index,
      });

      if (insertError) {
        failures.push(`${file.name} (${insertError.message})`);
        continue;
      }

      successes.push(file.name);
    }

    if (successes.length) {
      setStatus({
        type: "success",
        message: `Uploaded ${successes.length} image${successes.length > 1 ? "s" : ""} successfully.`,
      });
      reset({
        caption: "",
        altText: "",
        order: baseOrder + successes.length,
        sectionId: values.sectionId,
        files: undefined,
      });
      router.refresh();
    }

    if (failures.length) {
      setStatus({
        type: "error",
        message: `Issues uploading: ${failures.join(", ")}`,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/40 p-6 text-white"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm">
          Section
          <select
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-white focus:outline-none"
            {...register("sectionId")}
          >
            <option value="">Select</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id} className="bg-slate-900 text-white">
                {section.title}
              </option>
            ))}
          </select>
          {errors.sectionId && (
            <p className="mt-1 text-xs text-rose-300">{errors.sectionId.message}</p>
          )}
        </label>
        <label className="text-sm">
          Display Order
          <input
            type="number"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-white focus:outline-none"
            {...register("order", { valueAsNumber: true })}
          />
          {errors.order && (
            <p className="mt-1 text-xs text-rose-300">{errors.order.message}</p>
          )}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm">
          Caption
          <input
            type="text"
            placeholder="Lookbook still, 2024"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white focus:outline-none"
            {...register("caption")}
          />
        </label>
        <label className="text-sm">
          Alt Text
          <input
            type="text"
            placeholder="Model in handcrafted print"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white focus:outline-none"
            {...register("altText")}
          />
        </label>
      </div>
      <label className="text-sm">
        Image Files
        <input
          type="file"
          accept="image/*"
          multiple
          className="mt-2 w-full rounded-2xl border border-dashed border-white/25 bg-transparent px-4 py-6 text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-900"
          {...register("files")}
        />
        {errors.files && (
          <p className="mt-1 text-xs text-rose-300">{errors.files.message as string}</p>
        )}
      </label>
      {status && (
        <p
          className={`rounded-2xl border px-4 py-3 text-sm ${
            status.type === "success"
              ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
              : "border-rose-400/40 bg-rose-500/10 text-rose-100"
          }`}
        >
          {status.message}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Uploading..." : "Upload images"}
      </button>
    </form>
  );
};

