import React, { useEffect } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing } from "shared/styles/styles"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { useStaffAppState } from "staff-app/context/staffAppContext"
import { Toolbar } from "staff-app/components/toolbar/toolbar.component"
import { getSortedStudents } from "staff-app/utils/sort-function"

export const HomeBoardPage: React.FC = () => {
  const { state, dispatch } = useStaffAppState()
  // TODO: remove commemnts at Last
  // const [isRollMode, setIsRollMode] = useState(false)
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  const sortedStudents = data && getSortedStudents(data.students, state)

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      // setIsRollMode(false)
      dispatch({ type: "CHANGE_ROLL_MODE", payload: false })
    }
  }

  console.log("BEFORE RETURN")
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
            {sortedStudents?.map((s) => (
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
      <ActiveRollOverlay isActive={state.isRollMode} onItemClick={onActiveRollAction} />
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
