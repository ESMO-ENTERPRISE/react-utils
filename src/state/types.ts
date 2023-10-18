export type OptionsType = {
    cacheTime?: number;
    staleTime?: number;
    keepCacheAlways?: boolean;
    keepValueOnKeyChanges?: boolean;
    dataStayInSync?: boolean;
    autoFetchEnabled?: boolean;
    refetchOnWindowFocus?: boolean;
    markUpdatesAsTransitions?: boolean;
    offsetBottom?: number;
};

export type DefaultOptionsContextType = {
    options: OptionsType;
    notifyQueryChanges?: (params: any) => void;
    notifyInvalidation?: (params: any) => void;
    notifyCancellationOfQuery?: (params: any) => void;
    mutateQuery?: (queryKey: any[] | string, data: any) => void;
};

export type ProviderPropsType = {
    options?: OptionsType;
    children: React.ReactNode;
};

export type DataQueryKeyType = any[] | string;

export type NotifyQueryChangesParamType = {
    queryKey: DataQueryKeyType;
    data: any;
    status: string;
    reason: string;
};

export type ReasonType = Error | string | null;

export type MutatorFunType<T> = (newData: T) => Promise<any>;

export type Context = { queryKey: DataQueryKeyType; param: any };
export type FetcherType =
    | null
    | undefined
    | ((context: Context) => Promise<any>);

export type OnSuccessFunType<T> = (data: T) => void;
export type OnErrorFunType = (err: ReasonType) => void;
export type OnSettledFunType<T> = (data: T, reason: ReasonType) => void;
export type OnMutatedFunType<T> = (data: T) => void;

export type UseDataQueryOptionsType<T> = Omit<OptionsType, "offsetBottom"> & {
    initialData?: T;
} & {
    onSuccess?: OnSuccessFunType<T>;
    onError?: OnErrorFunType;
    onSettled?: OnSettledFunType<T>;
    onMutated?: OnMutatedFunType<T>;
};

export type MetadataType = {
    isInitialCall: boolean;
    beforeStaleTime: number;
    staleTimeOutId: number | undefined;
    prevKey: string;
    previouslyEnabledAutoFetch: boolean;
};