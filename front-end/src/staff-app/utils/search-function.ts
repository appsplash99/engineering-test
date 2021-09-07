import { PersonHelper } from "shared/models/person"
import { UpdatedStudent } from "staff-app/context/staffAppContext.type"

export const getSearchedStudents = (allStudents: UpdatedStudent[], searchString: string) => {
  if (searchString === "") {
    return allStudents
  }

  return allStudents?.filter((student) => (PersonHelper.getFullName(student).toLowerCase().includes(searchString.toLowerCase()) ? student : false))
}
