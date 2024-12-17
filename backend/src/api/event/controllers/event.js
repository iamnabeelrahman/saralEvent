'use strict';

/**
 * event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;

    // Fetch the event dynamically with all fields and populated relations
    const entity = await strapi.entityService.findOne('api::event.event', id, {
      populate: ctx.query.populate || '*', // Dynamically include all relations if not specified
    });

    if (!entity) {
      return ctx.notFound('Event not found');
    }

    // Sanitize and return the response
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },
}));
