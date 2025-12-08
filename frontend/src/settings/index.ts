import { createSettingsProxy } from 'envarna';
import { ApiSettings } from './api';

export const settings = createSettingsProxy({
    api: () => ApiSettings.load(),
});
