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
import UploadModal from "../components/UploadModal";
import usePosts from "../hooks/usePosts";
import PostList from "../components/PostList";
import useMediaQuery from "../hooks/useMediaQuery";

const MARKS = [
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
];

export default function Posts() {
  const {
    posts,
    isOpen,
    addPost,
    toggleOpen,
    changeColumns,
    totalColumns,
    isLoading,
    error,
    onChangeSearch,
    search,
    searchPosts,
  } = usePosts();
  const isTablet = useMediaQuery("max-width: 1200px");
  return (
    <AppShell
      padding="md"
      header={<Header height={60} p="xs"></Header>}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Box className="mt-3 px-2 mx-auto" sx={{ maxWidth: "1400px" }}>
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
              value={search}
              onChange={onChangeSearch}
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
              onClick={searchPosts}
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

          {!isTablet && (
            <>
              <label className="d-block mb-2 mt-4 mx-auto text-center">
                Columns ({totalColumns})
              </label>
              <Slider
                radius="xl"
                label={(val) => MARKS.find((mark) => mark.value === val).label}
                defaultValue={40}
                step={10}
                min={20}
                max={50}
                onChangeEnd={changeColumns}
                styles={{ markLabel: { display: "none" } }}
                sx={{ maxWidth: "300px" }}
                mx="auto"
              />
            </>
          )}
        </Box>

        <PostList posts={posts} {...{ totalColumns, isLoading, error }}>
          <UploadModal {...{ isOpen, toggleOpen, addPost }} />
        </PostList>
      </Box>
    </AppShell>
  );
}
