import React, { useCallback, useEffect } from "react";
import {
  Container,
  InfinityIndicator,
  List,
  ListItem,
  LoadingIndicator,
  ScrollableContainer,
} from "./InfinityScroll.styles";

export type Item = {
  key: string;
  name: string;
};

interface InfinityScrollProps {
  loading?: boolean;
  infiniteLoading?: boolean;
  hasMore?: boolean;
  data: Item[];
  onScroll(): void;
}

const InfinityScroll = ({
  loading,
  hasMore,
  infiniteLoading,
  onScroll,
  data,
}: InfinityScrollProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((el: HTMLDivElement) => {
    if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
      if (hasMore && !infiniteLoading) {
        onScroll();
      }
    }
  }, []);

  useEffect(() => {
    let element: HTMLDivElement;

    const scrollListener = () => {
      handleScroll(element);
    };

    if (ref.current) {
      element = ref.current;
      element.addEventListener("scroll", scrollListener);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", scrollListener);
      }
    };
  }, []);

  return (
    <Container>
      <ScrollableContainer ref={ref}>
        {loading ? (
          <LoadingIndicator>Loading...</LoadingIndicator>
        ) : (
          <List>
            {data.map((item) => (
              <ListItem key={item.key}>{item.name}</ListItem>
            ))}
          </List>
        )}
      </ScrollableContainer>

      {infiniteLoading && <InfinityIndicator>Loading ...</InfinityIndicator>}
    </Container>
  );
};

export default InfinityScroll;
