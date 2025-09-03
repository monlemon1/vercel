import { getContext } from './get-context';

interface DangerouslyDeleteOptions {
  /**
   * The time in seconds for how long the stale data can be served while revalidating the new data in the background. If none is provided, the default is 0 and the stale data will be deleted.
   */
  revalidationDeadlineSeconds?: number;
}

/**
 * Vercel Cache Purge APIs.
 */
export interface PurgeApi {
  /**
   * Invalidate a tag or tags by marking them as stale. On the next access to data associated with the tag, the stale data will be served and a background revalidation will be triggered.
   *
   * @param tag The tag or tags to invalidate.
   * @returns A promise that resolves when the invalidate is complete.
   */
  invalidateTag: (tag: string | string[]) => Promise<void>;

  /**
   * Invalidate a src image or images by marking them as stale. On the next access to data associated with the src image, the stale data will be served and a background revalidation will be triggered.
   *
   * @param src The src image or images to invalidate.
   * @returns A promise that resolves when the invalidate is complete.
   */
  invalidateSrcImage: (src: string | string[]) => Promise<void>;

  /**
   * Delete a tag or tags. The data will be deleted after the specified revalidation deadline, the default revalidation deadline is 0 and the data will be deleted immediately.
   *
   * @param tag The tag or tags to delete.
   * @param options The options for the delete that specify the deletion strategy.
   * @returns A promise that resolves when the delete is complete.
   */
  dangerouslyDeleteTag: (
    tag: string | string[],
    options?: DangerouslyDeleteOptions
  ) => Promise<void>;

  /**
   * Delete a src image or images. The data will be deleted after the specified revalidation deadline, the default revalidation deadline is 0 and the data will be deleted immediately.
   *
   * @param src The src image or images to delete.
   * @param options The options for the delete that specify the deletion strategy.
   * @returns A promise that resolves when the delete is complete.
   */
  dangerouslyDeleteSrcImage: (
    src: string | string[],
    options?: DangerouslyDeleteOptions
  ) => Promise<void>;
}

export const invalidateTag = (tag: string | string[]) => {
  const api = getContext().purge;
  if (api) {
    return api.invalidateTag(tag);
  }
  return Promise.resolve();
};

export const invalidateSrcImage = (src: string | string[]) => {
  const api = getContext().purge;
  if (api) {
    return api.invalidateSrcImage(src);
  }
  return Promise.resolve();
};

export const dangerouslyDeleteTag = (
  tag: string | string[],
  options?: DangerouslyDeleteOptions
) => {
  const api = getContext().purge;
  if (api) {
    return api.dangerouslyDeleteTag(tag, options);
  }
  return Promise.resolve();
};

export const dangerouslyDeleteSrcImage = (
  src: string | string[],
  options?: DangerouslyDeleteOptions
) => {
  const api = getContext().purge;
  if (api) {
    return api.dangerouslyDeleteSrcImage(src, options);
  }
  return Promise.resolve();
};
