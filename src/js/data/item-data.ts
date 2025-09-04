import type { ItemData } from '../types/item-data';
import { ItemType } from '../types/item-type';

/**
 * Hey, you. Yes, you.
 *
 * You are probably editing this because something is missing/outdated?
 *
 * If there is a new queue type, add them in ItemType (follow the import above).
 *
 * Make sure that the cost is per crate, and the translation layer between LogiHub
 * and this is also updated... Some in-game name are simply way too long or provide
 * nothing of value.
 */

/**
 * Store all item data
 */
export const itemData = new Map<string, ItemData>([
    [
        '0001',
        {
            name: 'Neville AT Rifle',
            logihubName: '20 Neville Anti-Tank Rifle',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 150,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0002',
        {
            name: '20mm',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0003',
        {
            name: 'Varsi AT Grenade',
            logihubName: 'B2 Varsi Anti-Tank Grenade',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 95,
                emat: 125,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0004',
        {
            name: 'Mounted Bonesaw',
            logihubName: 'Mounted Bonesaw MK.3',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 5,
                hemat: 0,
            },
        },
    ],
    [
        '0005',
        {
            name: 'Bonesaw Mk3',
            logihubName: 'Bonesaw MK.3',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 25,
                hemat: 0,
            },
        },
    ],
    [
        '0006',
        {
            name: 'ARC/RPG',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 60,
                emat: 150,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0007',
        {
            name: "Willow's Bane Flamethrower",
            logihubName: 'Willow’s Bane Model 845',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 165,
                emat: 0,
                rmat: 30,
                hemat: 0,
            },
        },
    ],
    [
        '0008',
        {
            name: 'Tremola Grenade',
            logihubName: 'Tremola Grenade GPb-1',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 75,
                emat: 100,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0009',
        {
            name: 'Malone Ratcatcher',
            logihubName: 'Malone Ratcatcher MK.1',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 5,
                hemat: 0,
            },
        },
    ],
    [
        '0010',
        {
            name: '30mm',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 80,
                emat: 40,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0011',
        {
            name: 'Cremari Mortar',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 25,
                hemat: 0,
            },
        },
    ],
    [
        '0012',
        {
            name: 'Flare Mortar Shell',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 60,
                emat: 15,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0013',
        {
            name: 'Shrapnel Mortar Shell',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 60,
                emat: 20,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0014',
        {
            name: 'HE Mortar Shell',
            logihubName: 'Mortar Shell',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 60,
                emat: 70,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0015',
        {
            name: 'White Ash Flask Grenade',
            logihubName: 'BF5 White Ash Flask Grenade',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 100,
                emat: 80,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0016',
        {
            name: 'Mammon 91-b',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 100,
                emat: 20,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0017',
        {
            name: 'AT Sticky',
            logihubName: 'Anti-Tank Sticky Bomb',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 50,
                emat: 100,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0018',
        {
            name: 'Carnyx AT Rocket Launcher',
            logihubName: 'Carnyx Anti-Tank Rocket Launcher',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 125,
                emat: 0,
                rmat: 15,
                hemat: 0,
            },
        },
    ],
    [
        '0019',
        {
            name: 'Cutler Foebreaker',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 5,
                hemat: 0,
            },
        },
    ],
    [
        '0020',
        {
            name: 'Cutler Launcher',
            logihubName: 'Cutler Launcher 4',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 35,
                hemat: 0,
            },
        },
    ],
    [
        '0021',
        {
            name: 'RPG',
            type: ItemType.HEAVY_ARM,
            cost: {
                bmat: 60,
                emat: 90,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0022',
        {
            name: '150mm',
            type: ItemType.HEAVY_SHELL,
            cost: {
                bmat: 150,
                emat: 0,
                rmat: 0,
                hemat: 60,
            },
        },
    ],
    [
        '0023',
        {
            name: '120mm',
            type: ItemType.HEAVY_SHELL,
            cost: {
                bmat: 120,
                emat: 0,
                rmat: 0,
                hemat: 10,
            },
        },
    ],
    [
        '0024',
        {
            name: '250mm "Purity"',
            logihubName: '250mm "Purity" Shell',
            type: ItemType.HEAVY_SHELL,
            cost: {
                bmat: 120,
                emat: 0,
                rmat: 0,
                hemat: 100,
            },
        },
    ],
    [
        '0025',
        {
            name: '68mm',
            type: ItemType.HEAVY_SHELL,
            cost: {
                bmat: 120,
                emat: 240,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0026',
        {
            name: '40mm',
            type: ItemType.HEAVY_SHELL,
            cost: {
                bmat: 160,
                emat: 240,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0027',
        {
            name: 'Booker Storm Rifle',
            logihubName: 'Booker Storm Rifle Model 838',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 0,
                emat: 0,
                rmat: 15,
                hemat: 0,
            },
        },
    ],
    [
        '0028',
        {
            name: 'Aalto Storm Rifle',
            logihubName: 'Aalto Storm Rifle 24',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 0,
                emat: 0,
                rmat: 15,
                hemat: 0,
            },
        },
    ],
    [
        '0029',
        {
            name: '7.92mm',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 120,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0030',
        {
            name: 'Malone Mk2',
            logihubName: 'Malone MK.2',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 0,
                emat: 0,
                rmat: 25,
                hemat: 0,
            },
        },
    ],
    [
        '0031',
        {
            name: 'Harpa Frag Grenade',
            logihubName: 'A3 Harpa Fragmentation Grenade',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 100,
                emat: 40,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0032',
        {
            name: 'Cascadier',
            logihubName: 'Cascadier 873',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 60,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0033',
        {
            name: '8mm',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 40,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0034',
        {
            name: 'Cometa Revolver',
            logihubName: 'Cometa T2-9',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 60,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0035',
        {
            name: 'The Hangman',
            logihubName: 'The Hangman 757',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 125,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0036',
        {
            name: '.44',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 40,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0037',
        {
            name: 'Sampo Auto-Rifle',
            logihubName: 'Sampo Auto-Rifle 77',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 125,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0038',
        {
            name: 'Blakerow Rifle',
            logihubName: 'Blakerow 871',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 140,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0039',
        {
            name: 'Clancy Cinder',
            logihubName: 'Clancy Cinder M3',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 130,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0040',
        {
            name: 'Hawthorne',
            logihubName: 'No.2B Hawthorne',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 70,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0041',
        {
            name: 'Loughcaster',
            logihubName: 'No.2 Loughcaster',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0042',
        {
            name: 'Clancy-Raca Sniper',
            logihubName: 'Clancy-Raca M4',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 250,
                emat: 0,
                rmat: 25,
                hemat: 0,
            },
        },
    ],
    [
        '0043',
        {
            name: '7.62mm',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 80,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0044',
        {
            name: 'Buckshot',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 80,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0045',
        {
            name: 'Liar SMG',
            // ???? why the odd quote
            logihubName: 'No.1 “The Liar” Submachinegun',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 120,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0046',
        {
            name: 'Fiddler SMG',
            logihubName: 'Fiddler Submachine Gun Model 868',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 120,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0047',
        {
            name: '9mm',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 80,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0048',
        {
            name: 'Smoke Grenade',
            logihubName: 'PT-815 Smoke Grenade',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 80,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0049',
        {
            name: 'Green Ash Grenade',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 140,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0050',
        {
            name: '12.7mm',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0051',
        {
            name: 'Pillory Scattergun',
            logihubName: 'No.4 The Pillory Scattergun',
            type: ItemType.LIGHT_ARM,
            cost: {
                bmat: 80,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0052',
        {
            name: 'Bandages',
            type: ItemType.MEDICAL,
            cost: {
                bmat: 80,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0053',
        {
            name: 'First Aid Kit',
            type: ItemType.MEDICAL,
            cost: {
                bmat: 60,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0054',
        {
            name: 'Trauma Kit',
            type: ItemType.MEDICAL,
            cost: {
                bmat: 80,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0055',
        {
            name: 'Blood Plasma',
            type: ItemType.MEDICAL,
            cost: {
                bmat: 80,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0056',
        {
            name: 'Soldier Supplies',
            type: ItemType.MEDICAL,
            cost: {
                bmat: 80,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0057',
        {
            name: 'Specialist (Heavy)',
            // here too??
            logihubName: 'Specialist’s Overcoat',
            type: ItemType.UNIFORM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0058',
        {
            name: 'Gunner (Knight)',
            // mannnnn
            logihubName: 'Gunner’s Breastplate',
            type: ItemType.UNIFORM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0059',
        {
            name: 'Sapper (Engineer)',
            logihubName: 'Sapper Gear',
            type: ItemType.UNIFORM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0060',
        {
            name: 'Physician (Medic)',
            logihubName: 'Physician’s Jacket',
            type: ItemType.UNIFORM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0061',
        {
            name: 'Officer (Larp)',
            logihubName: 'Officer’s Regalia',
            type: ItemType.UNIFORM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0062',
        {
            name: 'Outrider (Scout)',
            logihubName: 'Outrider’s Mantle',
            type: ItemType.UNIFORM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0063',
        {
            name: 'Parka',
            logihubName: 'Caoivish Parka',
            type: ItemType.UNIFORM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0064',
        {
            name: 'Boiler Suit (Tanker)',
            logihubName: 'Padded Boiler Suit',
            type: ItemType.UNIFORM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0065',
        {
            name: "Gentleman's Peacoat (Sailor)",
            logihubName: 'Gentleman’s Peacoat',
            type: ItemType.UNIFORM,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0066',
        {
            name: 'Barbed Wire',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 15,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0067',
        {
            name: 'Binoculars',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 75,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0068',
        {
            name: 'Havoc Charge',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 75,
                emat: 0,
                rmat: 0,
                hemat: 40,
            },
        },
    ],
    [
        '0069',
        {
            name: "Willow's Bane Ammo",
            type: ItemType.UTILITIES,
            cost: {
                bmat: 135,
                emat: 0,
                rmat: 0,
                hemat: 20,
            },
        },
    ],
    [
        '0070',
        {
            name: 'Listening Kit',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 150,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0071',
        {
            name: 'Wind Sock',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 150,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0072',
        {
            name: 'Metal Beam',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 25,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0073',
        {
            name: 'Radio Backpack',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 150,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0074',
        {
            name: 'Sandbag',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 15,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0075',
        {
            name: 'Havoc Charge Detonator',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 75,
                emat: 0,
                rmat: 0,
                hemat: 20,
            },
        },
    ],
    [
        '0076',
        {
            name: 'Alligator Charge',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 150,
                emat: 160,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0077',
        {
            name: 'Shovel',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 200,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0078',
        {
            name: 'Sledgehammer',
            logihubName: 'Sledge Hammer',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 200,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0079',
        {
            name: 'Tripod',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0080',
        {
            name: 'Wrench',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 75,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0081',
        {
            name: 'Water Bucket',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 80,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0082',
        {
            name: 'Buckhorn CCQ-18',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 40,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0083',
        {
            name: 'Falias Raiding Club',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 200,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0084',
        {
            name: 'Gas Mask',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 160,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0085',
        {
            name: 'Gas Mask Filter',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 100,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
    [
        '0086',
        {
            name: 'The Ospreay',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 85,
                emat: 0,
                rmat: 10,
                hemat: 0,
            },
        },
    ],
    [
        '0087',
        {
            name: 'Radio',
            type: ItemType.UTILITIES,
            cost: {
                bmat: 75,
                emat: 0,
                rmat: 0,
                hemat: 0,
            },
        },
    ],
]);
