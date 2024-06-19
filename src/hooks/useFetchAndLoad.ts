import { useEffect, useState } from 'react';
import { AxiosCall } from '../models';

export const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [controller, setController] = useState<AbortController | null>(null);

  const callEndpoint = async (axiosCall: AxiosCall<any>) => {
    if (controller) controller.abort();
    if (axiosCall.controller) setController(axiosCall.controller);
    setLoading(true);
    try {
      const result = await axiosCall.call;
      setData(result.data);
      return result;
    } catch (error: any) {
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cancelEndpoint = () => {
    if (controller) {
      controller.abort();
      setController(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, []);

  return { loading, data, callEndpoint };
};
