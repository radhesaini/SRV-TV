"""create_tables

Revision ID: e87d1b29b59a
Revises: 
Create Date: 2022-02-08 17:13:48.035292

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e87d1b29b59a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('channels',
    sa.Column('channel_id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('channel_name', sa.String(length=30), nullable=False),
    sa.Column('owner', sa.String(length=30), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('paused_on', sa.DateTime(), nullable=True),
    sa.Column('status', sa.String(length=30), nullable=False),
    sa.Column('subcribed_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('unsubscribed_on', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('channel_id'),
    sa.UniqueConstraint('channel_id')
    )
    op.create_table('users',
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=30), nullable=False),
    sa.Column('last_name', sa.String(length=30), nullable=False),
    sa.Column('dob', sa.DateTime(), nullable=False),
    sa.Column('address', sa.String(length=5000), nullable=False),
    sa.Column('contect', sa.String(length=15), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.PrimaryKeyConstraint('email'),
    sa.UniqueConstraint('contect'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    op.drop_table('channels')
    # ### end Alembic commands ###