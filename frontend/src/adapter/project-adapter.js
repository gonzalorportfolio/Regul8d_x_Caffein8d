import { fetchHandler, getPatchOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/projects';

export const getAllProjects = async () => {
  return await fetchHandler(baseUrl);
}

export const updateProject = async (projectId, updatedFields) => {
  return await fetchHandler(`${baseUrl}/${projectId}`, getPatchOptions(updatedFields));
}
