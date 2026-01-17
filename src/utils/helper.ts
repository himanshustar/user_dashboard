export const capitalizeWords = (str) => {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "Not specified";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const getStatusColor = (status) => {
  switch (status) {
    case "open":
      return "bg-green-500/20 text-green-400 border border-green-500/30";
    case "closed":
      return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
    case "lost":
      return "bg-red-500/20 text-red-400 border border-red-500/30";
    default:
      return "bg-slate-500/20 text-slate-400 border border-slate-500/30";
  }
};
