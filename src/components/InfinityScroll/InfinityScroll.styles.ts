import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const ScrollableContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
`;

export const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  padding: 10px;
  display: flex;
  align-items: center;
  font-weight: bold;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }

  &:hover {
    background: #343434;
  }
`;

export const LoadingIndicator = styled.div`
  background: green;
  color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  width: fit-content;
`;

export const InfinityIndicator = styled(LoadingIndicator)`
  position: absolute;
  bottom: 20px;
  transform: translateX(50vw);
`;
