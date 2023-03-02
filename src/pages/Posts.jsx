import { useEffect, useRef, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  Title,
  Input,
  ActionIcon,
  Flex,
  Button,
  Slider,
  Box,
} from "@mantine/core";
import { BiSearchAlt2 } from "react-icons/bi";
import { VscSettings } from "react-icons/vsc";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import VideoPlayerPost from "../components/VideoPlayerPost";
import useToggle from "../hooks/useToggle";
import axios from "axios";
import UploadModal from "../components/UploadModal";

const MARKS = [
  {
    value: 0,
    label: "0 columns",
  },
  {
    value: 10,
    label: "1 columns",
  },
  {
    value: 20,
    label: "2 columns",
  },
  {
    value: 30,
    label: "3 columns",
  },
  {
    value: 40,
    label: "4 columns",
  },
  {
    value: 50,
    label: "5 columns",
  },
  {
    value: 60,
    label: "6 columns",
  },
];

const fetchPosts = async () => {
  const res = await axios.get("http://localhost:5000/api/post");
  const posts = res.data?.data;
  return posts;
};

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [totalColumns, setTotalColumns] = useState(5);
  const columnsCached = useRef([]);
  const [isOpen, toggleOpen] = useToggle();

  useEffect(() => {
    (async () => {
      const posts = await fetchPosts();
      columnsCached.current = posts.map((post) => (
        <VideoPlayerPost {...post} key={post._id} />
      ));
      setPosts(posts);
    })();
  }, []);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 200 }} p="xs" sx={{ background: "transparent" }}>
          {/* Navbar content */}
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <main className="mt-3 px-2">
        <Title
          className="title"
          order={1}
          sx={{ fontSize: "5rem", textAlign: "center", color: "#fff" }}
          mb="0.5rem"
        >
          ShortYou
        </Title>
        <Text c="dimmed" sx={{ fontSize: "18px", textAlign: "center" }}>
          Find your favorite videos and share them with yours friends
        </Text>

        <Box sx={{ maxWidth: "800px" }} mx="auto" mt="2rem">
          <Flex justify="center" align="center">
            <Input
              icon={<BiSearchAlt2 style={{ fontSize: "18px" }} />}
              variant="filled"
              placeholder="Write something here ..."
              radius="xl"
              size="md"
              wrapperProps={{
                style: { width: "100%" },
              }}
            />
            <ActionIcon
              radius="xl"
              ml="0.5rem"
              size="lg"
              sx={{ fontSize: "22px" }}
            >
              <VscSettings />
            </ActionIcon>
          </Flex>

          <Flex justify="center" gap="8px">
            <Button
              fullWidth
              color="gray"
              variant="outline"
              radius="xl"
              mt="1rem"
              sx={{ maxWidth: "150px" }}
            >
              Search
            </Button>

            <Button
              fullWidth
              variant="light"
              radius="xl"
              mt="1rem"
              onClick={toggleOpen}
              sx={{ maxWidth: "150px" }}
            >
              Upload
            </Button>
          </Flex>

          <Slider
            radius="xl"
            label={(val) => MARKS.find((mark) => mark.value === val).label}
            defaultValue={50}
            step={10}
            min={10}
            max={60}
            onChangeEnd={(value) => setTotalColumns(value / 10)}
            //marks={MARKS}
            styles={{ markLabel: { display: "none" } }}
            sx={{ maxWidth: "300px" }}
            mt="2rem"
            mx="auto"
          />
        </Box>

        {posts.length > 0 && (
          <ResponsiveMasonry
            className="mt-4 "
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: totalColumns }}
          >
            <Masonry gutter="8px">
              {posts.map((post) => (
                <article key={post._id}>
                  <VideoPlayerPost {...post} />
                </article>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}

        <UploadModal {...{ isOpen, toggleOpen }} />
      </main>
    </AppShell>
  );
}
