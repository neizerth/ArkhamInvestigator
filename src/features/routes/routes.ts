export const getInvestigatorRoute = ({
  id,
  language
}: {
  language: string
  id: string
}) => `/${language}/investigator/${id}`