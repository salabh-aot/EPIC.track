// TaskList.js
import React from "react";
import { GanttRow } from "./types";
import { barHeight, rowHeight } from "./constants";
import { ETParagraph } from "components/shared";
import { Palette } from "styles/theme";
import TaskListSkeleton from "./TaskListSkeleton";
import { useGanttContext } from "./GanttContext";
import TriggerOnViewed from "components/shared/DummyElement";

const TaskList = () => {
  const { rows } = useGanttContext();
  const {
    enableLazyLoading,
    totalRows,
    onLazyLoad = () => {
      return;
    },
    isLoadingMore,
  } = useGanttContext();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        left: 0,
        backgroundColor: Palette.neutral.bg.light,
      }}
    >
      <div
        style={{
          height: rowHeight * 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: "1em",
          position: "sticky",
          top: 0,
          zIndex: 2,
          backgroundColor: Palette.neutral.bg.light,
        }}
      >
        <ETParagraph bold>Works</ETParagraph>
      </div>
      <div
        style={{
          zIndex: 1,
        }}
      >
        {rows.map((row) => (
          <div
            key={row.id}
            style={{
              height: barHeight,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingLeft: "1em",
            }}
          >
            <ETParagraph
              color={Palette.primary.accent.main}
              sx={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {row.name}
            </ETParagraph>
          </div>
        ))}
      </div>

      {enableLazyLoading && (
        <>
          {!isLoadingMore && totalRows !== rows.length && (
            <TriggerOnViewed callbackFn={() => onLazyLoad()} />
          )}
          {totalRows !== rows.length && (
            <div
              style={{
                zIndex: 1,
              }}
            >
              <TaskListSkeleton />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskList;
