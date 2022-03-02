const conditionallyAddClassnames = (...args: (string | boolean)[]) => {
  return args.filter(Boolean).join(' ')
}
export default conditionallyAddClassnames
