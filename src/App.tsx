import { useCallback, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import InfinityScroll, { Item } from "./components/InfinityScroll";
import { useDebounce } from "./hooks/useDebounce";

interface Pagination {
  current: number; // current item of the list
  offset: number; // how much items do you want to bring when the user scrolls
  loading: boolean; // the initial loading
  infinity: boolean; // if it is loading more items by scroll
  hasMore: boolean; // if it has more items to load
}

const DEFAULT_PAGINATION: Pagination = {
  current: 0,
  offset: 50,
  hasMore: true,
  loading: false,
  infinity: false,
};

const fakeApiCall = async (
  current: number,
  offset: number
): Promise<Array<Item>> => {
  const data = Array.from({ length: offset }).map((_, index) => ({
    key: `item-${index + current}`,
    name: `Item ${index + current}`,
  }));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};

function App() {
  const [data, setData] = useState<Item[]>([]);
  const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION);

  const debouncedPagination = useDebounce(pagination, 500);

  const onScroll = useCallback(() => {
    if (debouncedPagination.loading || !debouncedPagination.hasMore) {
      return;
    }

    // updating the pagination
    setPagination((currentPagination) => ({
      ...currentPagination,
      current: currentPagination.current + DEFAULT_PAGINATION.offset,
    }));
  }, [debouncedPagination]);

  const fetchData = async (paginate = false) => {
    setPagination((currPagination) => ({
      ...currPagination,
      loading: !paginate,
      infinity: paginate,
    }));

    try {
      const { current, offset } = pagination;
      const data = await fakeApiCall(current, offset);

      if (paginate) {
        // if we are paginating then append the new data to the previous one
        setData((state) => [...state, ...data]);
      } else {
        // else just set the data
        setData(data);
      }
    } catch (error) {
      // handle your errors
      console.error(error);
    } finally {
      // set the loading flags to false
      setPagination((currPagination) => ({
        ...currPagination,
        loading: false,
        infinity: false,
        hasMore: true, // you can do some validation to check if there is more items to bring, the update this flag
      }));
    }
  };

  useEffect(() => {
    let ignore = false; // flag to prevent calling the function twice due to new rules of React 18

    if (!ignore) {
      fetchData(pagination.current !== DEFAULT_PAGINATION.current);
    }

    return () => {
      ignore = true;
    };
  }, [pagination.current]);

  return (
    <div className="App">
      <InfinityScroll
        data={data}
        onScroll={onScroll}
        hasMore={pagination.hasMore}
        loading={pagination.loading}
        infiniteLoading={pagination.infinity}
      />
    </div>
  );
}

export default App;
