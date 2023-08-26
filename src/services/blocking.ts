import { ApiClient, AppError } from '../classes';

const apiClient = new ApiClient();

export const blockUser = async (userToBlockId: number, userBlockingId: number) => {
  try {
    const res = await apiClient.blockUser(userToBlockId, userBlockingId);
    return res.data;
  } catch (e) {
    throw AppError.fromApiError(e);
  }
};

export const unblockUser = async (userToBlockId: number, userBlockingId: number) => {
  try {
    const res = await apiClient.unblockUser(userToBlockId, userBlockingId);
    return res.data;
  } catch (e) {
    throw AppError.fromApiError(e);
  }
};

export const isUserBlocked = async (userId: number, blockerId: number): Promise<boolean> => {
  try {
    const res = await apiClient.isUserBlocked(userId, blockerId);
    return res.data;
  } catch (e) {
    throw AppError.fromApiError(e);
  }
};
