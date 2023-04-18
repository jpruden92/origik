// assets
import { IconUser, IconTag } from '@tabler/icons';

// constant
const icons = { IconUser, IconTag };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'sign',
            title: 'Firmar',
            type: 'item',
            url: '/sign',
            icon: icons.IconTag,
            breadcrumbs: false
        },
        {
            id: 'check',
            title: 'Check',
            type: 'item',
            url: '/check',
            icon: icons.IconTag,
            breadcrumbs: false
        }
    ]
};

export default other;
