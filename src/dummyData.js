import { BlockTypes } from '@constants';

const { NAME, CONTACT_INFO, SECTION_TITLE, ITEM_TITLE_WITH_DATE, ITEM_CAPTION, BULLET_POINT, SPACE_BLOCK } = BlockTypes;

// Some dummy data; we'll be receiving this data from some data storage later on
export const dummyResume = [
    { type: NAME, text: 'Russel Tsang' },
    { type: CONTACT_INFO, address: 'Brooklyn NY', email: 'test@test.com', phoneNumber: '123-123-1234' },
    { type: SECTION_TITLE, text: 'Experience' },
    { type: ITEM_TITLE_WITH_DATE, itemTitle: 'First Workplace', date: 'Jan 2019' },
    { type: ITEM_CAPTION, text: 'First Job Position' },
    { type: BULLET_POINT, text: 'Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce' },
    { type: BULLET_POINT, text: 'Brussels sprout coriander water chestnut gourd swiss beetroot chard chicory earthnut pea potato' },
    { type: SPACE_BLOCK },
    { type: ITEM_TITLE_WITH_DATE, itemTitle: 'Second Workplace', date: 'Feb 2020' },
    { type: ITEM_CAPTION, text: 'Second Job Position' },
    { type: BULLET_POINT, text: 'Nori grape silver beet broccoli kombu beet greens quandong swiss' },
    { type: BULLET_POINT, text: 'Celery quandong swiss chard chicory earthnut pea potato' },
];