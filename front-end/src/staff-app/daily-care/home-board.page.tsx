import React, { useEffect } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useStaffAppState } from "staff-app/context/staffAppContext"
import { getSortedStudents, getSearchedStudents, getFilteredStudents } from "staff-app/utils"
import { Toolbar, StudentListTile, ActiveRollOverlay } from "staff-app/components"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"

export const HomeBoardPage: React.FC = () => {
  const { state, dispatch } = useStaffAppState()
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    loadState === "loaded" && dispatch({ type: "ADD_ALL_STUDENTS_WITH_ROLL_TYPE_AS_UNMARK_INTO_UPDATED_STUDENT_ROLLS", payload: data?.students })
  }, [loadState, dispatch, data])

  const sortedStudents = data && getSortedStudents(state.updatedStudentRolls, state)
  const searchedStudents = sortedStudents && getSearchedStudents(sortedStudents, state.searchString)
  const filteredStudents = searchedStudents && getFilteredStudents(searchedStudents, state)

  return (
    <>
      <S.PageContainer>
        <Toolbar />
        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}
        {loadState === "loaded" && data?.students && (
          <>
            {filteredStudents?.map((s) => (
              <StudentListTile key={s.id} student={s} />
            ))}
          </>
        )}
        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay />
    </>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
}
