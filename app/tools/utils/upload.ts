export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('github_token', process.env.GITHUB_TOKEN || '');
  formData.append('github_owner', process.env.GITHUB_OWNER || '');
  formData.append('github_repo', process.env.GITHUB_REPO || '');
  formData.append('github_branch', process.env.GITHUB_BRANCH || 'main');
  formData.append('folder', process.env.FOLDER || 'uploads');

  const response = await fetch('https://picser.pages.dev/api/public-upload', {
    method: 'POST',
    body: formData,
  });

  const data = (await response.json()) as {
    success: boolean;
    message: string;
    data: {
      urls: {
        jsdelivr: string;
      };
    };
  };
  return {
    success: data.success,
    message: data.message,
    url: data.data.urls.jsdelivr,
  };
};
