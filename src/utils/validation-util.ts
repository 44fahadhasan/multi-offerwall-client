import z from "zod";

type ZodIssues = {
  expected?: string;
  code?: string;
  path: string[];
  message: string;
}[];

const formatZodErrors = (issues: ZodIssues): string[] => {
  return issues.map((issue, idx) => {
    const field = String(issue.path?.[0] ?? "field");

    // Convert camelCase → Proper Label
    const label = field
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (c) => c.toUpperCase());

    let message = issue.message;

    // Required field detection
    if (issue.code === "invalid_type") {
      const normalCaseLabel = label.charAt(0).toUpperCase() + label.slice(1);
      message = `${normalCaseLabel} is required.`;
    }

    return `${idx + 1}. ${label}: ${message}`;
  });
};

export const validatePayload = (
  payload: Record<string, unknown>,
  zodSchema: z.ZodType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> => {
  const result = zodSchema.safeParse(payload);

  if (!result.success) {
    const errors = formatZodErrors(result.error.issues as ZodIssues);
    const messages = errors.join("\n");

    return {
      success: false,
      message: messages,
      data: null,
    };
  }

  return {
    success: true,
    data: result.data,
  };
};
