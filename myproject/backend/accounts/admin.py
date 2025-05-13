from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

admin.site.register(CustomUser, UserAdmin)

from .models import Transaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('particulars', 'opening', 'receipt', 'issued', 'balance', 'date', 'signed_by')
    search_fields = ('particulars', 'signed_by', 'date')
    list_filter = ('date', 'signed_by')