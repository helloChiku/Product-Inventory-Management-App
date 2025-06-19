import { Express } from 'express';

export const startServer = async (app: Express) => {
  try {
    const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('server connection failed:', error);
    process.exit(1);
  }
};
