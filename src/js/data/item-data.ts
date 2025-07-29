import type { ItemData } from '../types/item-data';
import { ItemType } from '../types/item-type';

/**
 * Hey, you. Yes, you.
 *
 * You probably editing this because something is missing/outdated?
 * If there is a new queue type, add them in ItemType (follow the import above).
 * You can add item in any position you want, the order doesn't really matter.
 * The app do not persist any data inbetween sessions, so having internal ID
 * being changed is not a big deal.
 * Make sure that the cost is per crate though!
 */
export const itemData: ItemData[] = [
    {
        name: 'Neville AT Rifle',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 150,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
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
    {
        name: 'Varsi AT Grenade',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 95,
            emat: 125,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Mounted Bonesaw',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 5,
            hemat: 0,
        },
    },
    {
        name: 'Bonesaw Mk3',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 25,
            hemat: 0,
        },
    },
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
    {
        name: "Willow's Bane Flamethrower",
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 165,
            emat: 0,
            rmat: 30,
            hemat: 0,
        },
    },
    {
        name: 'Tremola Grenade',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 75,
            emat: 100,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Malone Ratcatcher',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 5,
            hemat: 0,
        },
    },
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
    {
        name: 'HE Mortar Shell',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 60,
            emat: 70,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'White Ash Flask Grenade',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 100,
            emat: 80,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Mammon HE Grenade',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 100,
            emat: 20,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'AT Sticky',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 50,
            emat: 100,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Carnyx ATRL',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 125,
            emat: 0,
            rmat: 15,
            hemat: 0,
        },
    },
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
    {
        name: 'Cutler Launcher',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 35,
            hemat: 0,
        },
    },
    {
        name: 'RPG Shell',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 60,
            emat: 90,
            rmat: 0,
            hemat: 0,
        },
    },
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
    {
        name: '250mm',
        type: ItemType.HEAVY_SHELL,
        cost: {
            bmat: 120,
            emat: 0,
            rmat: 0,
            hemat: 100,
        },
    },
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
    {
        name: 'Booker Storm Rifle',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 0,
            emat: 0,
            rmat: 15,
            hemat: 0,
        },
    },
    {
        name: 'Aalto Storm Rifle',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 0,
            emat: 0,
            rmat: 15,
            hemat: 0,
        },
    },
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
    {
        name: 'Malone Mk2',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 0,
            emat: 0,
            rmat: 25,
            hemat: 0,
        },
    },
    {
        name: 'Harpa Grenade',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 100,
            emat: 40,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Cascadier',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 60,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
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
    {
        name: 'Cometa Revolver',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 60,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Hangman',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 125,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: '0.44',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 40,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Sampo Autorifle',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 125,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Blakerow Rifle',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 140,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Clancy Cinder',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 130,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Hawthorne',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 70,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Loughcaster',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Clancy-Raca Sniper',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 250,
            emat: 0,
            rmat: 25,
            hemat: 0,
        },
    },
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
    {
        name: 'Brasa Shotgun',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 80,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
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
    {
        name: 'Liar SMG',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 120,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Fiddler SMG',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 120,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
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
    {
        name: 'Smoke Grenade',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 120,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
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
    {
        name: 'Pillory Scattergun',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 80,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
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
    {
        name: 'Specialist (Heavy)',
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Gunner (Knight)',
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Sapper (Engineer)',
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Physician (Medic)',
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Officer (Larp)',
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Outrider (Scout)',
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Parka',
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Boiler Suit (Tanker)',
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: "Gentleman's Peacoat (Sailor)",
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
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
    {
        name: 'Havoc Detonator',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 75,
            emat: 0,
            rmat: 0,
            hemat: 20,
        },
    },
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
    {
        name: 'Sledgehammer',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 200,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'AT Mine',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 100,
            emat: 10,
            rmat: 0,
            hemat: 0,
        },
    },
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
    {
        name: 'Bayonet',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 40,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
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
    {
        name: 'Gas Filter',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Ospreay GL',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 85,
            emat: 0,
            rmat: 10,
            hemat: 0,
        },
    },
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
];
