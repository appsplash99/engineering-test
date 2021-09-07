import React, { useEffect } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useStaffAppState } from "staff-app/context/staffAppContext"
import { getSortedStudents, getSearchedStudents } from "staff-app/utils"
import { Toolbar, StudentListTile, ActiveRollOverlay } from "staff-app/components"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"

export const HomeBoardPage: React.FC = () => {
  const { state } = useStaffAppState()
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  const sortedStudents = data && getSortedStudents(data.students, state)
  const searchedStudents = sortedStudents && getSearchedStudents(sortedStudents, state.searchString)

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
            {searchedStudents?.map((s) => (
              <StudentListTile key={s.id} isRollMode={state.isRollMode} student={s} />
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
