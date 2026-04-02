// Format numbers as currency for display
function formatSalary(num) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    num,
  );
}
