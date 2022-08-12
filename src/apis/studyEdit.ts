import { axiosAuthInstance } from './axiosInstance';

export const editStudy = async (formData: FormData, study_id: string) => {
  const { data } = await axiosAuthInstance({
    url: `/api/v1/study-groups/${study_id}`,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
