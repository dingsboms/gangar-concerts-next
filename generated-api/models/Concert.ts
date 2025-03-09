/* tslint:disable */
/* eslint-disable */
/**
 * FirstWebApplication | v1
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Concert
 */
export interface Concert {
    /**
     * 
     * @type {string}
     * @memberof Concert
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Concert
     */
    location: string;
    /**
     * 
     * @type {Date}
     * @memberof Concert
     */
    date?: Date;
    /**
     * 
     * @type {number}
     * @memberof Concert
     */
    id?: number;
    /**
     * 
     * @type {Date}
     * @memberof Concert
     */
    created?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Concert
     */
    lastModified?: Date;
}

/**
 * Check if a given object implements the Concert interface.
 */
export function instanceOfConcert(value: object): value is Concert {
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('location' in value) || value['location'] === undefined) return false;
    return true;
}

export function ConcertFromJSON(json: any): Concert {
    return ConcertFromJSONTyped(json, false);
}

export function ConcertFromJSONTyped(json: any, ignoreDiscriminator: boolean): Concert {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'],
        'location': json['location'],
        'date': json['date'] == null ? undefined : (new Date(json['date'])),
        'id': json['id'] == null ? undefined : json['id'],
        'created': json['created'] == null ? undefined : (new Date(json['created'])),
        'lastModified': json['lastModified'] == null ? undefined : (new Date(json['lastModified'])),
    };
}

export function ConcertToJSON(json: any): Concert {
    return ConcertToJSONTyped(json, false);
}

export function ConcertToJSONTyped(value?: Concert | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'title': value['title'],
        'location': value['location'],
        'date': value['date'] == null ? undefined : ((value['date']).toISOString()),
        'id': value['id'],
        'created': value['created'] == null ? undefined : ((value['created']).toISOString()),
        'lastModified': value['lastModified'] == null ? undefined : ((value['lastModified']).toISOString()),
    };
}

