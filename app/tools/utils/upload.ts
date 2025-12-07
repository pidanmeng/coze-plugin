import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const uploadImage = async (file: File) => {
  try {
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
    console.log('Response', await response.json());

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
  } catch (error) {
    return {
      success: false,
      message: 'Error uploading file',
      url: '',
    };
  }
};
export const uploadFile = async (file: File) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const client = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });

    const fileName = `${Date.now()}-${file.name}`;
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    });

    await client.send(command);

    const publicUrl = `${process.env.R2_PUBLIC_DOMAIN}/${fileName}`;

    return {
      success: true,
      message: 'File uploaded successfully',
      url: publicUrl,
    };
  } catch (error) {
    console.error('Error uploading file to R2:', error);
    return {
      success: false,
      message: 'Error uploading file to R2',
      url: '',
    };
  }
};
