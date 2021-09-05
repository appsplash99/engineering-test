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
import { Toolbar, ToolbarAction } from "staff-app/components/toolbar/toolbar.component"

export const HomeBoardPage: React.FC = () => {
  const {
    state: { isRollMode },
    dispatch,
  } = useStaffAppState()
  // TODO: remove commemnts at Last
  // const [isRollMode, setIsRollMode] = useState(false)
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  const onToolbarAction = (action: ToolbarAction) => {
    if (action === "roll") {
      // setIsRollMode(true)
      dispatch({ type: "CHANGE_ROLL_MODE", payload: true })
    }
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      // setIsRollMode(false)
      dispatch({ type: "CHANGE_ROLL_MODE", payload: false })
    }
  }

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.students && (
          <>
            {data.students.map((s) => (
              <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
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
