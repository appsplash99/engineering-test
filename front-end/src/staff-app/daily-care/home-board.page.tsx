import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useStaffAppState } from "staff-app/context/staffAppContext"
import { getSortedStudents, getSearchedStudents, getFilteredStudents } from "staff-app/utils"
import { Toolbar, StudentListTile, ActiveRollOverlay } from "staff-app/components"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Colors } from "shared/styles/colors"

export const HomeBoardPage: React.FC = () => {
  const { state, dispatch } = useStaffAppState()
  const [getStudents, data, studentsDataLoading] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [saveRollinLocalStorage, saveRollData, saveRollLoading] = useApi<any>({ url: "save-roll" })
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    studentsDataLoading === "loaded" && dispatch({ type: "ADD_ALL_STUDENTS_WITH_ROLL_TYPE_AS_UNMARK_INTO_UPDATED_STUDENT_ROLLS", payload: data?.students })
  }, [studentsDataLoading, dispatch, data])

  const sortedStudents = data && getSortedStudents(state.updatedStudentRolls, state)
  const searchedStudents = sortedStudents && getSearchedStudents(sortedStudents, state.searchString)
  const filteredStudents = searchedStudents && getFilteredStudents(searchedStudents, state)

  return (
    <>
      <S.PageContainer>
        <Toolbar />
        {saveRollData && saveRollLoading === "loading" && <S.Label>Saving Roll to Local Storage...</S.Label>}
        {saveRollData && saveRollData.success === true && (
          <S.Label
            showAlert={showAlert}
            onClick={() => {
              setShowAlert(false)
            }}
          >
            Roll State Saved in Local Storage
          </S.Label>
        )}
        {studentsDataLoading === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}
        {studentsDataLoading === "loaded" && data?.students && (
          <>
            {filteredStudents?.map((s) => (
              <StudentListTile key={s.id} student={s} />
            ))}
          </>
        )}
        {studentsDataLoading === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay saveRollinLocalStorage={saveRollinLocalStorage} setShowAlert={setShowAlert} />
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
  Label: styled.div<{ showAlert?: boolean }>`
    display: ${({ showAlert }) => showAlert && "block"};
    padding: ${Spacing.u2};
    background-color: ${Colors.blue.base};
    color: ${Colors.neutral.lighter};
    text-align: center;
    margin: ${Spacing.u1} auto;
    cursor: pointer;
  `,
}
