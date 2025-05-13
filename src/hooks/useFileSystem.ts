import * as FileSystem from "expo-file-system";

export default function useFileSystem() {
  const saveToFileSystem = async ({
    from,
    to,
  }: {
    from: string;
    to: string;
  }) => {
    await FileSystem.copyAsync({
      from,
      to,
    });
  };

  const loadFromFileSystem = async ({ uri }: { uri: string }) => {
    return await FileSystem.readDirectoryAsync(uri);
  };

  const deleteFromFileSystem = async ({ uri }: { uri: string }) => {
    await FileSystem.deleteAsync(uri);
  };

  return {
    saveToFileSystem,
    loadFromFileSystem,
    deleteFromFileSystem,
  };
}
