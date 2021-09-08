import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { getActivities } from "api/get-activities"
import { Activity } from "shared/models/activity"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Colors } from "shared/styles/colors"
import { useStaffAppState } from "staff-app/context/staffAppContext"

export const ActivityPage: React.FC = () => {
  const {
    state: { updatedStudentRolls },
  } = useStaffAppState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [activitiesData, setActivitiesData] = useState<Activity[]>([])

  useEffect(() => {
    setLoading(true)
    const fetchActivities = async () => {
      const resp = await getActivities()
      resp.success && setActivitiesData(resp.activity)
      !resp.success && setError(true)
      console.log(JSON.stringify(resp, null, 4))
      setLoading(false)
    }
    fetchActivities()
  }, [updatedStudentRolls])

  return (
    <S.Container>
      {loading && (
        <CenteredContainer>
          <FontAwesomeIcon icon="spinner" size="2x" spin />
        </CenteredContainer>
      )}
      {!loading && error && <>Unable to receive Data</>}
      {!loading && !error && (
        <>
          {activitiesData.map((item) => (
            <S.Card>
              <div>Type: {item.type}</div>
              <S.SubSection>
                <div>id: {item.entity.id}</div>
                <div>id: {item.entity.name}</div>
                <div>id: {item.entity.completed_at}</div>
              </S.SubSection>
              <div>date : {item.date}</div>
            </S.Card>
          ))}
        </>
      )}
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
  Card: styled.div`
    background-color: ${Colors.blue.base};
    color: ${Colors.neutral.base};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${Spacing.u2};
    padding: ${Spacing.u1};
    margin-bottom: ${Spacing.u3};
  `,
  SubSection: styled.div`
    display: flex;
    align-items: center;
    gap: ${Spacing.u1};
  `,
}
