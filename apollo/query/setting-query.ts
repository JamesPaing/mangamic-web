import { gql } from '@apollo/client';

export const GET_SETTING = gql`
    query GetSetting {
        getSetting {
            id
            _id
            isOn
            choices {
                _id
                title
                mainImage
                id
                status
                summary
                readCount
                genres {
                    _id
                    name
                }
                chapters {
                    _id
                    name
                }
                slug
            }
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_SETTING = gql`
    mutation UpdateSetting($setting: SettingInput) {
        updateSetting(setting: $setting) {
            id
            _id
            isOn
            choices {
                _id
                title
            }
            createdAt
            updatedAt
        }
    }
`;
