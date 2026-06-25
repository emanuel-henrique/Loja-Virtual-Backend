import { PrismaClient } from '@prisma/client';
import { CreateSiteConfigInput, UpdateSiteConfigInput } from '../schemas/siteConfigSchema';

const prisma = new PrismaClient();

export class SiteConfigService {
  private mapConfig(config: any) {
    if (!config) return null;
    return {
      id: config.id,
      store_name: config.storeName,
      primary_color: config.primaryColor,
      secondary_color: config.secondaryColor,
      accent_color: config.accentColor,
      logo_url: config.logoUrl,
      whatsapp_number: config.whatsappNumber,
      atendimento1: config.atendimento1,
      atendimento2: config.atendimento2,
      atendimento3: config.atendimento3,
      created_at: config.createdAt,
      updated_at: config.updatedAt,
    };
  }

  async getSiteConfig() {
    const config = await prisma.siteConfig.findFirst();
    if (!config) {
      const newConfig = await prisma.siteConfig.create({
        data: {
          storeName: 'Storm',
          primaryColor: '#1a1a1a',
          secondaryColor: '#ffffff',
          accentColor: '#3b82f6',
          whatsappNumber: '5511999999999'
        }
      });
      return this.mapConfig(newConfig);
    }
    return this.mapConfig(config);
  }

  async updateSiteConfig(id: string, data: any) {
    const mappedData = {
      storeName: data.store_name,
      primaryColor: data.primary_color,
      secondaryColor: data.secondary_color,
      accentColor: data.accent_color,
      logoUrl: data.logo_url,
      whatsappNumber: data.whatsapp_number,
      atendimento1: data.atendimento1,
      atendimento2: data.atendimento2,
      atendimento3: data.atendimento3,
    };
    
    // Remove undefined values
    Object.keys(mappedData).forEach(key => {
      if ((mappedData as any)[key] === undefined) {
        delete (mappedData as any)[key];
      }
    });

    const updated = await prisma.siteConfig.update({
      where: { id },
      data: mappedData
    });
    return this.mapConfig(updated);
  }
}
