import { Person, PersonHelper } from "shared/models/person"

export const getSearchedStudents = (allStudents: Person[], searchString: string) => {
  if (searchString === "") {
    return allStudents
  }

  return allStudents?.filter((student) => (PersonHelper.getFullName(student).toLowerCase().includes(searchString.toLowerCase()) ? student : false))
}
